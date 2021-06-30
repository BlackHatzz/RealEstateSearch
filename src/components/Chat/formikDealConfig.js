import * as Yup from "yup";

export const defaultValues = {
  deal: "",
};

export const validationSchema = Yup.object().shape({
  deal: Yup.number()
    .typeError("Bạn phải điền số")
    .required("Không được để trống")
    .min(0.01, "Giá nhỏ nhất là 0.01")
    .max(1000, "Giá tối đa là 1000"),
});
