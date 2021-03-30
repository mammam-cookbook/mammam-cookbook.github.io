import * as yup from 'yup'

export const IMAGE_TYPE = {
  NORMAL: 'NORMAL',
  WIDE: 'WIDE'
}

export const CATEGORY_ITEMS = [
  'Món Việt',
  'Món Trung',
  'Món Hàn',
  'Món Nhật',
  'Món Thái',
  'Món Âu',
  'Đồ uống',
  'Tráng miệng'
]

export const MAX_COOKING_TIME = 1000

export const stepsSchema = yup.object({
  content: yup.string().trim().required('* Vui lòng nhập bước thực hiện'),
  time: yup
    .number()
    .nullable()
    .min(1, 'Thời gian thực hiện phải lớn hơn 0 phút')
})

export const validationRecipeSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('* Vui lòng nhập tiêu đề')
    .max(255, 'Tiêu đề không được quá 255 kí tự'),
  ration: yup
    .number()
    .required('* Vui lòng nhập khẩu phần')
    .min(1, 'Công thức dành cho ít nhất 1 người ăn'),
  cookingTime: yup
    .number()
    .required('* Vui lòng nhập thời gian thực hiện')
    .min(1, 'Thời gian thực hiện nhiều hơn 0 phút')
    .max(
      MAX_COOKING_TIME,
      `Thời gian thực hiện không quá ${MAX_COOKING_TIME} phút`
    ),
  difficultLevel: yup.number().required('* Vui lòng chọn độ khó'),
  ingredients: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 nguyên liệu')
    .of(yup.string().trim().required('* Vui lòng nhập nguyên liệu')),
  steps: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 bước thực hiện')
    .of(stepsSchema),
  avatar: yup.array().required('* Vui chọn hình đại diện cho công thức')
})
