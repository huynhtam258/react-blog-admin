import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "../../../../store";
import { login } from "../../auth.thunk";
import { BASE_KEY } from './../../../../enums/index';
import { Card, CardBody, CardHeader, Typography, CardFooter, Button, Input, IconButton } from "@material-tailwind/react";
import { setToken } from "../../auth.slice";
import { showToast } from "../../../../stores/toast.slice";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: ILoginForm) => {
    dispatch(login(data)).unwrap().then((result) => {
      const { access_token, refresh_token, client_key } = result;
      localStorage.setItem(BASE_KEY.ACCESS_TOKEN, access_token);
      localStorage.setItem(BASE_KEY.REFRESH_TOKEN, refresh_token);
      localStorage.setItem(BASE_KEY.CLIENT_KEY, client_key);
      dispatch(setToken(access_token));
      navigate('/');
    }).catch(() => {
      dispatch(showToast({ message: 'Login failed!' }));
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            label="Email"
            size="lg"
            {...register("email", { required: true })}
            crossOrigin={""}
          />
          {errors.email && <span>Email is required</span>}
          <div className="relative">
            <Input
              label="Password"
              size="lg"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              crossOrigin={""}
            />
            <div
              className="absolute h-full flex items-center w-[30px] inset-y-0 right-0"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </div>
          </div>
          {errors.password && <span>Password is required</span>}
        </CardBody>
        <CardFooter className="pt-0">
          <Button disabled={!isValid} variant="gradient" fullWidth type="submit">
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
  );
}