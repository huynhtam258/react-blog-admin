import { useState } from "react"
import { login } from "../../auth.thunk"
import { useAppDispatch } from "../../../../store"
import { useNavigate } from "react-router-dom"
import { BASE_KEY } from './../../../../enums/index'
import { Card, CardBody, CardHeader, Typography, CardFooter, Button, Input } from "@material-tailwind/react"
import { setToken } from "../../auth.slice"

const initialLoginForm = {
  email: '',
  password: ''
}
interface ILoginForm {
  email: string,
  password: string
}
export default function Login() {
  const [loginForm, setLoginForm] = useState<ILoginForm>(initialLoginForm)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(loginForm)).unwrap().then((result) => {
      const { access_token, refresh_token, client_key } = result
      localStorage.setItem(BASE_KEY.ACCESS_TOKEN, access_token)
      localStorage.setItem(BASE_KEY.REFRESH_TOKEN, refresh_token)
      localStorage.setItem(BASE_KEY.CLIENT_KEY, client_key)
      dispatch(setToken(access_token))
      // 
    })
  }
  return (
    <Card className="w-96">

      <form onSubmit={handleSubmit}>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input 
            crossOrigin={undefined} 
            label="Email" 
            size="lg" 
            value={loginForm.email} 
            onChange={(event) => setLoginForm((prev) => ({
              ...prev,
              email: event.target.value
            }))} 
          />
          <Input 
            crossOrigin={undefined} 
            label="Password" 
            size="lg"
            onChange={(event) => setLoginForm((prev) => ({
              ...prev,
              password: event.target.value
            }))}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </form>

    </Card>
  )
}