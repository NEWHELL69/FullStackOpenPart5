import { useEffect, useState } from "react"

const Message = ({ initialMessage, initialMessageId }) => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if(!initialMessage || !initialMessageId) {
            return;
        }

        setMessage(initialMessage)

        const timeoutId = setTimeout(() => {
            setMessage('')
        }, 5000)

        return (() => {
            clearInterval(timeoutId)
        })
    }, [initialMessageId])

    return (
        <div>
            <p>{message}</p>
        </div>  
    )
}
  
export default Message