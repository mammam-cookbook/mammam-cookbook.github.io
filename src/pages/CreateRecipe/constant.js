import i18n from 'ultis/i18n'
import * as yup from 'yup'

export const LEVEL = [
  {
    code: 'easy',
    title: i18n.t('create.easy')
  },
  {
    code: 'medium',
    title: i18n.t('create.medium')
  },
  {
    code: 'hard',
    title: i18n.t('create.hard')
  }
]

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
  time: yup.number().nullable().min(1, 'Thời gian thực hiện > 0 phút')
})

export const ingresSchema = yup.object({
  selectAmount: yup.number().min(1, 'Khối lượng > 0')
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
  cooking_time: yup
    .number()
    .required('* Vui lòng nhập thời gian thực hiện')
    .min(1, 'Thời gian thực hiện nhiều hơn 0 phút')
    .max(
      MAX_COOKING_TIME,
      `Thời gian thực hiện không quá ${MAX_COOKING_TIME} phút`
    ),
  level: yup.string().required('* Vui lòng chọn độ khó'),
  ingredients: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 nguyên liệu')
    .of(ingresSchema),
  steps: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 bước thực hiện')
    .of(stepsSchema),
  avatar: yup.array().required('* Vui chọn hình đại diện cho công thức')
})
