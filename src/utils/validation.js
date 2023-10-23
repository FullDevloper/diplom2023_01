import  * as Yup from "yup";
export const signInSchema = Yup.object({
    name: Yup.string()
      .required("Нэрээ оруулна уу?")
      .matches(/^[a-zA-Z_ ]*$/, "Буруу тэмдэгт орууллаа")
      .min(2, "Овог нэр хамгийн багадаа 2 тэмдэгт байна.")
      .max(25, "Овог нэр хамгийнн ихдээ 25 тэмдэгт байна."),
    email: Yup.string()
      .required("И-мэйл заавал оруул")
      .email("буруу и-мэйл"),
    status: Yup.string().max(64, "Status must be less than 64 characters."),
    password: Yup.string()
      .required("Нууц үг заавал оруулан уу?")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
      ),
  });
  export const signUpSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Invalid email address."),
    password: Yup.string().required("Password is required."),
  });