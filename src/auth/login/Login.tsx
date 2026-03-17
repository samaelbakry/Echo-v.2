import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { tokenContext } from "@/context/TokenContextProvider";
import { loginSchema, type loginSchemaType } from "@/lib/AuthSchema.ts/authSchema";
import { loginForm } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()
  const {setIsLoggedIn }=useContext(tokenContext)

  const form = useForm<loginSchemaType>({
    mode:"all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver:zodResolver(loginSchema)
  });


  async function sendFormData(formData:loginSchemaType){
  try {
    const response =  await loginForm(formData)
    console.log(response);

    if(response.data.success){
     
      localStorage.setItem("token" ,response.data.data.token)
      toast.success("Account logged in Successfully !" , {
        position:"top-center"
      })
      setIsLoggedIn(true)
      navigate("/home")
    }
  } catch (error : any) {
      console.log(error.response.data.error);
  }
 }

  return (
    <>
       <Helmet>
        <title>Login Page </title>
      </Helmet>
      <div className=" text-gray-700 p-3">
        <h2 className="md:text-2xl text-blue-900 dark:text-white/80 font-bold text-left my-3">
         welcome back join us now !
        </h2>
        <form action="" className="space-y-3 dark:text-white" onSubmit={form.handleSubmit(sendFormData)}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
           <div className="flex items-center justify-between my-4">
          <p className="dark:text-white/70">
           Don't have account ?
            <Link className="font-bold mx-1 dark:text-white" to={"/register"}>
              Register
            </Link>
          </p>
          <Button  type="submit">
            {form.formState.isSubmitting ? "Loading..": "submit"}
          </Button>
        </div>
        </form>
       
      </div>
    </>
  );
}

export default Login
