import * as Yup from "yup";

export const defaultValues = {
  deal: "",
};

export const validationSchema = Yup.object().shape({
  deal: Yup.number()
    .typeError("bạn phải điền số")
    .required("Bắt buộc")
    .min(1, "giá nhỏ nhất là 1")
    .max(1000000, "giá trị tối đa là 1000000"),
});
