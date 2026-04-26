
export default function getDaysLeft(createdAt:string){

    const created = new Date(createdAt) 
    const expiration = new Date(created) 
    expiration.setDate(created.getDate() + 7)

    const diff = expiration.getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}