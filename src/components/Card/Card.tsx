import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import CardHeader from "./CardHeader"

const Card = () => {
  return <>
  <div className="bg-blue-50/70 shadow rounded-xl my-5">
  <CardHeader/>
  <CardBody/>
  <CardFooter/>
  </div>
  </>
}

export default Card
