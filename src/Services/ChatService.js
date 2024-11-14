import axios from "axios"

export const Chat = async(question) => {
    console.log(question)
    try{
        const response = await axios.post('http://127.0.0.1:5000/get_answer', {question: question}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    }catch(e){
        console.log(e)
    }
}