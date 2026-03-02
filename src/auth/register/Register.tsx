import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, type registerSchemaType } from "@/lib/AuthSchema.ts/authSchema";
import { registerForm } from "@/services/authServices";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";


const Register = () => {
  const navigate = useNavigate()

  const form = useForm({
    mode:"all",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver:zodResolver(registerSchema)
  });


  async function sendFormData(formData:registerSchemaType){
  try {
    const response =  await registerForm(formData)
    console.log(response);

    if(response.data.success){
      setTimeout(() => {
       navigate("/login")
       localStorage.setItem("token" ,response.data.data.token)
      }, 1000);
      toast.success("Account Created Successfully !" , {
        position:"top-center"
      })
    }
  } catch (error : any) {
      console.log(error.response.data.error);
  }
 }

  return (
    <>
      <div className=" text-gray-700 p-3 ">
        <h2 className="md:text-2xl text-blue-800 font-bold text-left my-3">
          New to echo ? join us now !
        </h2>
        <form action="" className="space-y-3" onSubmit={form.handleSubmit(sendFormData)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="select user name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Repassword</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="Repassword"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex items-center gap-2">
            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="date"
                    placeholder="Repassword"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                </Field>
              )}
            />
          </div>
           <div className="flex items-center justify-between my-4">
          <p>
            already have an account ?
            <Link className="font-bold mx-1" to={"/login"}>
              Log in
            </Link>
          </p>
          <Button  type="submit" className="cursor-pointer">
            {form.formState.isSubmitting ? <ImSpinner8 className="animated-spin" /> : "submit"}
          </Button>
        </div>
        </form>
       
      </div>
    </>
  );
};

export default Register;
