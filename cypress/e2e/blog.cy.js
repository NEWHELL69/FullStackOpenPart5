const user = {
  'username': 'user456',
  'name': 'Emily Johnson',
  'password': 'secure987'
}

const blog =   {
  'title': 'Algorithms Unveiled',
  'author': 'Alan Turing',
  'url': 'http://www.example.com/unveiled-algorithms.pdf',
  'likes': 0
}

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
      cy.get('.likeCount').contains(blog.likes + 1)
    })
  })
})