const user = {
  username: 'user456',
  name: 'Emily Johnson',
  password: 'secure987'
}

const anotherUser = {
  username: 'coolCat87',
  name: 'Michael Lee',
  password: 'safepass22'
}

const blog = {
  title: 'Algorithms Unveiled',
  author: 'Alan Turing',
  url: 'http://www.example.com/unveiled-algorithms.pdf',
}

const blog1 = {
  title: 'Mastering Algorithmic Artistry',
  author: 'Donald Knuth',
  url: 'http://www.example.com/algorithmic-artistry.pdf',
}

const blog2 = {
  title: 'Algorithmic Wonders',
  author: 'Ada Lovelace',
  url: 'http://www.example.com/algorithmic-wonders.pdf',
}

// These are in need of dire optimizations. Multiple tries are required to pass the whole suite.
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(user.username)
      cy.get('input:last').type(user.password)
      cy.contains('login').click()
      cy.contains('You are logged in, 200')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('Invalid username')
      cy.get('input:last').type('Invalid password')
      cy.contains('login').click()
      cy.contains('Invalid password or username, 401')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type(user.username)
      cy.get('input:last').type(user.password)
      cy.contains('login').click()
      cy.contains('You are logged in, 200')
    })

    it('A blog can be created', function() {
      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog.title)
      cy.get('input[placeholder="Author"]').type(blog.author)
      cy.get('input[placeholder="URL"]').type(blog.url)
      cy.contains('submit').click()
      cy.contains(`Added new blog, blog title ${blog.title}, blog author ${blog.author}, 200`)
      cy.get('#blogList').contains(blog.url)
      cy.get('#blogList').contains(blog.author)
      cy.get('#blogList').contains(blog.title)
    })

    it('A blog can be liked', function() {
      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog.title)
      cy.get('input[placeholder="Author"]').type(blog.author)
      cy.get('input[placeholder="URL"]').type(blog.url)
      cy.contains('submit').click()
      cy.contains(`Added new blog, blog title ${blog.title}, blog author ${blog.author}, 200`)

      cy.get('details').click()
      cy.get('.likeBtn').click()
      cy.get('.likeCount').contains(1)
    })

    it('User who created the blog can delete it', function() {
      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog.title)
      cy.get('input[placeholder="Author"]').type(blog.author)
      cy.get('input[placeholder="URL"]').type(blog.url)
      cy.contains('submit').click()
      cy.contains(`Added new blog, blog title ${blog.title}, blog author ${blog.author}, 200`)

      cy.get('details').click()
      cy.get('.removeBtn').click()
      cy.get(blog.title).should('not.exist')
    })

    it('Only creator can see the delete button', function() {
      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog.title)
      cy.get('input[placeholder="Author"]').type(blog.author)
      cy.get('input[placeholder="URL"]').type(blog.url)
      cy.contains('submit').click()
      cy.contains(`Added new blog, blog title ${blog.title}, blog author ${blog.author}, 200`)

      cy.contains('Logout').click()
      cy.contains('User logged out, 200')

      cy.request('POST', 'http://localhost:3003/api/users', anotherUser)

      cy.get('input:first').type(anotherUser.username)
      cy.get('input:last').type(anotherUser.password)
      cy.contains('login').click()
      cy.contains('You are logged in, 200')

      cy.get('details').click()
      cy.get('.removeBtn').should('not.exist')
    })

    it('Blogs are ordered based on like count', function() {
      cy.intercept('PUT', '/api/blogs/*').as('incrementLike')
      cy.intercept('POST', '/api/blogs').as('blogAdded')

      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog.title)
      cy.get('input[placeholder="Author"]').type(blog.author)
      cy.get('input[placeholder="URL"]').type(blog.url)
      cy.contains('submit').click()
      cy.wait('@blogAdded')

      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog1.title)
      cy.get('input[placeholder="Author"]').type(blog1.author)
      cy.get('input[placeholder="URL"]').type(blog1.url)
      cy.contains('submit').click()
      cy.wait('@blogAdded')

      cy.contains('Show').click()
      cy.get('input[placeholder="Title"]').type(blog2.title)
      cy.get('input[placeholder="Author"]').type(blog2.author)
      cy.get('input[placeholder="URL"]').type(blog2.url)
      cy.contains('submit').click()
      cy.wait('@blogAdded')

      const vistedBlogsIndicesArr = [-1]
      let randomBlogIndex = -1

      for(let i = 0; i < 3; i++) {
        while(vistedBlogsIndicesArr.includes(randomBlogIndex)) {
          randomBlogIndex = Math.floor(Math.random()*3)
        }

        vistedBlogsIndicesArr.push(randomBlogIndex)

        for(let j = 0; j < Math.random()*10; j++) {
          cy.get('details').eq(randomBlogIndex).click()
          cy.get('.likeBtn').eq(randomBlogIndex).click()
          cy.wait('@incrementLike')
        }
      }

      let prevCount = -1
      let currentCount = -1

      cy.get('details').eq(0).click()
      cy.get('.likeCount').should('satisfy', (ele) => {
        return Number(ele.eq(0)[0].innerText) >= Number(ele.eq(1)[0].innerText)
      })

      cy.get('details').eq(0).click()
      cy.get('.likeCount').should('satisfy', (ele) => {
        return Number(ele.eq(1)[0].innerText) >= Number(ele.eq(2)[0].innerText)
      })
    })
  })
})