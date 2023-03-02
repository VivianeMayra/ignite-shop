import { useRouter } from "next/router"

export default function Product() {
  //busca um produto específico dentro da nossa api
  const { query } = useRouter()
  return <h1>produto:{JSON.stringify(query)} </h1>
}
