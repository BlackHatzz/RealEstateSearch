import * as Yup from "yup";

export const defaultValues = {
  email: "",
  displayName: "",
  avatar: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Định dạng email không đúng!")
    .required("Vui lòng điền đầy đủ thông tin"),
  displayName: Yup.string()
    .required("Vui lòng điền đầy đủ thông tin")
    .min(6, "Tên hiển thị cần tối thiểu 6 ký tự"),
});
