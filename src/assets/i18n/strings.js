import { MAX_COOKING_TIME } from 'pages/CreateRecipe/constants'

export const en = {
  common: {
    information: 'Information',
    error_message: 'An unexpected error has occured. Try again later.',
    ok: 'OK',
    cancel: 'Cancel',
    signinErr: 'Email or password may not correct. Please try again.',
    signupSuccess: 'Sign up succeed. Please sign in to continue.',
    forgotPassSuccess: 'Please check your email to reset password.',
    updatePassSuccess: 'Success updating password. Please login.',
    confirm: 'Confirm',
    create: 'Create',
    update: 'Update',
    add: 'Add',
    en: 'English',
    vi: 'Vietnamese',
    action: 'Action',
    find: 'Find',
    reset: 'Reset',
    save: 'Save'
  },
  auth: {
    login: 'Sign In',
    signup: 'Sign Up',
    logout: 'Log out',
    profile: 'Profile',
    settings: 'Settings',
    dashboard: 'Dashboard'
  },
  signin: {
    title: 'Sign in to your account to continue',
    email: 'Email',
    password: 'Password',
    donotHaveAccount: 'Don’t have an account? ',
    forgotPassword: 'Forgot password?',
    emailMax: 'Email must have at most 48 characters',
    emailInvalid: 'Invalid email',
    emailRequired: '* Please input email',
    passRequired: '* Please input password',
    passMin: 'Password must include at least 8 characters',
    passMax: 'Password must include at most 48 characters',
    fullnameRequired: '* Please input full name',
    fullnameMin: 'Full name must include at least 3 characters',
    fullnameMax: 'Full name must include at most 48 characters',
    fullnameInvalid: 'Invalid full name'
  },
  signup: {
    title: 'Please create a new account here',
    fullname: 'Full name',
    hadAccount: 'Already have an account? '
  },
  forgotPass: {
    title: 'Please input email to reset password',
    backToSignin: 'Back to Sign In',
    proceed: 'Proceed'
  },
  createPass: {
    title: 'Input new password to continue',
    confirmSameAsNew: 'Confirm password must be the same as password',
    confirmPass: 'Confirm password',
    resetPass: 'Reset password',
    newPass: 'New password',
    oldPass: 'Old password',
    newSameAsOld: 'New password must be different from the old one',
    changePassSuccess: 'Change password succeed. Please sign in to continue.',
    wrongOldPass: 'Old password is incorrect'
  },
  home: {
    title1: 'Eat good',
    title2: 'Feel good',
    tryItOut: 'Try it Out',
    browse: 'BROWSE',
    recipes: 'Recipes',
    mealPlanner: 'MEAL PLANNERS',
    createRecipe: 'CREATE MY RECIPE',
    searchHere: 'Search here',
    result: 'Result',
    filter: 'Filter',
    sort: 'Sort',
    recommend: 'RECOMMEND FOR YOU',
    whatToEat: 'WHAT TO EAT TODAY?',
    trendingToday: 'Trending Today',
    reset: 'RESET',
    inMyRecipe: ' IN MY FRIDGE',
    dishType: 'DISH TYPE',
    event: 'EVENTS',
    cuisine: 'CUISINE',
    searchPlaceholder: 'Search recipes'
  },
  create: {
    title: 'Title',
    titlePlaceholder: 'Type recipe title',
    level: 'Level',
    summary: 'Summary',
    summaryPlaceholder: 'Type recipe summary',
    categories: 'Categories',
    edit: 'Edit',
    ingredients: 'Ingredients',
    otherIngredients: 'Other Ingredients',
    otherIngredientsPlaceholder: 'Type other ingredients',
    ingredientsPlaceholder: 'Search ingredients',
    categoriesPlaceholder: 'Search categories',
    remove: 'Remove',
    add: 'Add',
    direction: 'Directions',
    step: 'STEP ',
    directionPlaceholder: 'Type your direction',
    addNewStep: 'Add new step',
    uploadThumbnail: 'Upload thumbnail images',
    dragOrDrop: 'Drag and drop a video',
    or: 'or',
    maxSize: 'Max size is 50mb',
    contributeToCreate: 'CONTRIBUTE TO CREATE THE RECIPE',
    saveDraft: 'SAVE DRAFT',
    create: 'CREATE',
    time: 'Time',
    min: 'min',
    step1: 'Summary',
    step2: 'Ingredients',
    step3: 'Direction',
    next: 'Next',
    prev: 'Previous',
    maxImg: '(Maximum 3 images)',
    uploading: 'Uploading',
    maxReach: 'Maximum images reached',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    measurePlaceholder: 'g',
    ration: 'Ration'
  },
  recipe: {
    sendComment: 'Send',
    comment: 'Comments',
    challenge: 'Challenge',
    updatedBy: 'Updated by',
    energy: 'Energy',
    readDirection: 'Read directions',
    iMadeIt: 'I made it',
    noComments: 'There is no comments',
    noChallenges: 'There is no challenges',
    signinToComment: 'Sign in to leave comment',
    showLessComment: 'Show less comments',
    showMoreComment: 'Show all comments',
    notSignIn: 'You are not signed in. Please sign in to leave comment',
    reply: 'Reply',
    oneReply: 'reply',
    replies: 'replies',
    confirmDeleteComment: 'Do you confirm to delete this comment?',
    delete: 'Delete',
    commentPlaceholder: 'Leave comment',
    addToCollection: 'Add to collection',
    addToMenu: 'Add to meal planner',
    addToShoppingList: 'Add to shopping list',
    noCollection: 'There is no collection',
    collectionNamePlaceholder: 'Please input collection name',
    collectionNameError: 'Invalid collection name',
    addNewCollection: 'Add new collection',
    chooseDate: 'Choose date',
    chooseSession: 'Choose session',
    morning: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    yum: 'Yum',
    easyPeasy: 'Easy peasy',
    yuck: 'Yuck',
    toughNut: 'Tough nut',
    all: 'All'
  },
  validation: {
    contentRequired: '* Enter direction',
    cookingTime: '> 0 min',
    massRequired: 'Mass > 0',
    titleRequired: '* Enter title',
    titleMaxLength: 'Title is no longer than 255 letters',
    rationRequired: '* Enter ration',
    rationMin: 'At least 1 person',
    cookingTimeRequired: '* Enter cooking time',
    cookingTimeMin: '> 0 min',
    cookingTimeMax: `< ${MAX_COOKING_TIME} min`,
    levelChoose: 'Select level',
    ingredientRequired: 'Add at least 1 ingredient',
    stepRequired: 'Add at least 1 step',
    thumbnailRequired: 'Select recipe thumbnail',
    categoryRule: 'Category name cannot contain special characters',
    categoryRequired: '* Enter category name'
  },
  dashboard: {
    addNewCategory: 'Add new category',
    updateCategory: 'Update category',
    parentCategory: 'Parent category',
    notSelectParentId: 'Do not select to create parent category',
    confirmToDeleteCategory: 'Do you confirm to delete this category?',
    enterTitleToFind: 'Enter title to find',
    parentCategoryVi: 'Vietnamese parent category',
    parentCategoryEn: 'English parent category'
  },
  search: {
    user: 'Users',
    filter: 'Filter',
    sortBy: 'Sort by',
    relevance: 'Relevance',
    newest: 'Newest',
    popular: 'Popular',
    inputIngre: 'With Ingredients',
    inputWithoutIngre: 'Without Ingredients',
    hour: 'hour',
    cookingTimeLessThan: 'Cooking time is less than',
    with: 'With',
    without: 'Without',
    noResult: 'There is no result'
  },
  profile: {
    follow: 'Follow',
    following: 'Following',
    followers: 'Followers',
    followings: 'Followings',
    collection: 'Collections',
    changeCollectionName: 'Change collection name',
    changeCollectionNamePlaceholder: 'Enter new name of collection',
    changeName: 'Change',
    noRecipeInCollection: 'There is no recipe in this collection',
    noCollections: 'There is no collection',
    confirmToDeleteCollection: 'Are you sure to delete this collection?',
    customize: 'Search optimization',
    userInfo: 'Personal information',
    shoppingList: 'Shopping list',
    changePassword: 'Modify password',
    changePassFrequently: 'Change password frequently to secure your account',
    updateProfileSucceed: 'Update profile succeed.',
    updateAvatar: 'Update avatar',
    noFollowing: 'Not followings',
    noFollower: 'No followers',
    deleteRecipeInCollection: 'Remove recipe',
    confirmToDeleteRecipeInCollection:
      'Do you confirm to remove this recipe out of collection?',
    deleteRecipe: 'Delete recipe',
    confirmToDeleteRecipe: 'Do you confirm to remove this recipe?',
    editRecipe: 'Edit recipe',
    deleteRecipeInMealPlanner: 'Remove recipe',
    dish: 'dish',
    dishes: 'dishes',
    today: 'Today',
    recommendPlanner: 'Recommend meal'
  },
  notification: {
    liked: 'reacted to your',
    commented: 'commented',
    followed: 'is now following you',
    replied: 'replied',
    notification: 'Notification',
    noNotification: 'There is no notifications'
  }
}

export const vi = {
  common: {
    information: 'Thông báo',
    error_message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
    ok: 'OK',
    cancel: 'Hủy',
    signinErr: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại',
    signupSuccess: 'Đăng ký thành công. Vui lòng đăng nhập để tiếp tục',
    forgotPassSuccess: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.',
    updatePassSuccess: 'Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại',
    confirm: 'Xác nhận',
    create: 'Tạo',
    add: 'Thêm',
    update: 'Cập nhật',
    en: 'Tiếng Anh',
    vi: 'Tiếng Việt',
    action: 'Tác vụ',
    find: 'Tìm',
    reset: 'Đặt lại',
    save: 'Lưu'
  },
  auth: {
    login: 'Đăng nhập',
    signup: 'Đăng ký',
    logout: 'Đăng xuất',
    profile: 'Hồ sơ',
    settings: 'Cài đặt',
    dashboard: 'Quản lý'
  },
  signin: {
    title: 'Đăng nhập để tiếp tục',
    email: 'Email',
    password: 'Mật khẩu',
    donotHaveAccount: 'Chưa có tài khoản? ',
    forgotPassword: 'Quên mật khẩu?',
    emailMax: 'Email bao gồm nhiều nhất 48 ký tự',
    emailInvalid: 'Email không hợp lệ',
    emailRequired: '* Vui lòng nhập email',
    passRequired: '* Vui lòng nhập mật khẩu',
    passMin: 'Mật khẩu phải bao gồm ít nhất 8 ký tự',
    passMax: 'Mật khẩu phải bao gồm nhiều nhất 48 ký tự',
    fullnameRequired: '* Vui lòng nhập họ tên',
    fullnameMin: 'Họ tên phải bao gồm ít nhất 3 ký tự',
    fullnameMax: 'Họ tên phải bao gồm nhiều nhất 48 ký tự',
    fullnameInvalid: 'Họ tên không hợp lệ'
  },
  signup: {
    title: 'Tạo tài khoản mới',
    fullname: 'Họ tên',
    hadAccount: 'Đã có tài khoản? '
  },
  forgotPass: {
    title: 'Nhập email để tạo lại mật khẩu',
    backToSignin: 'Trở về đăng nhập',
    proceed: 'Gửi'
  },
  createPass: {
    title: 'Nhập mật khẩu mới để tiếp tục',
    confirmSameAsNew: 'Mật khẩu nhập lại phải giống với mật khẩu mới',
    confirmPass: 'Nhập lại mật khẩu',
    resetPass: 'Tạo mật khẩu',
    newPass: 'Mật khẩu mới',
    oldPass: 'Mật khẩu cũ',
    newSameAsOld: 'Mật khẩu mới phải khác mật khẩu cũ',
    changePassSuccess: 'Đổi mật khẩu thành công. Đăng nhập lại để tiếp tục',
    wrongOldPass: 'Sai mật khẩu cũ'
  },
  home: {
    title1: 'Eat good',
    title2: 'Feel good',
    tryItOut: 'Thử ngay',
    browse: 'KHÁM PHÁ',
    recipes: 'Công thức',
    mealPlanner: 'TẠO THỰC ĐƠN',
    createRecipe: 'ĐĂNG CÔNG THỨC',
    searchHere: 'Tìm kiếm',
    result: 'Kết quả',
    filter: 'Lọc',
    sort: 'Sắp xếp',
    recommend: 'ĐỀ XUẤT CHO BẠN',
    whatToEat: 'HÔM NAY ĂN GÌ?',
    trendingToday: 'Phổ biến hôm nay',
    reset: 'ĐẶT LẠI',
    inMyRecipe: ' TRONG TỦ CỦA TÔI',
    dishType: 'DISH TYPE',
    event: 'DỊP LỂ',
    cuisine: 'ẨM THỰC',
    searchPlaceholder: 'Tìm kiếm công thức'
  },
  create: {
    title: 'Tiêu đề',
    titlePlaceholder: 'Nhập tiêu đề của công thức',
    level: 'Cấp độ',
    summary: 'Mô tả',
    summaryPlaceholder: 'Nhập mô tả cho công thức',
    categories: 'Phân loại',
    edit: 'Sửa',
    ingredients: 'Nguyên liệu',
    otherIngredients: 'Nguyên liệu khác',
    otherIngredientsPlaceholder: 'Nhập tên nguyên liệu khác',
    ingredientsPlaceholder: 'Tìm kiếm nguyên liệu',
    categoriesPlaceholder: 'Tìm kiếm phân loại',
    remove: 'Xóa',
    add: 'Thêm',
    direction: 'Hướng dẫn',
    step: 'BƯỚC ',
    directionPlaceholder: 'Nhập hướng dẩn cho bước này',
    addNewStep: 'Thêm bước thực hiện',
    uploadThumbnail: 'Tải lên hình ảnh',
    dragOrDrop: 'Kéo thả video',
    or: 'hoặc',
    maxSize: 'Dung lượng tối đa 50mb',
    contributeToCreate: 'CHO PHÉP ĐÓNG GÓP TỪ NGƯỜI DÙNG',
    saveDraft: 'LƯU NHÁP',
    create: 'ĐĂNG',
    time: 'Thời gian',
    min: 'phút',
    step1: 'Thông tin',
    step2: 'Nguyên liệu',
    step3: 'Hướng dẫn',
    next: 'Tiếp',
    prev: 'Trước',
    maxImg: '(Tối đa 3 ảnh)',
    uploading: 'Đang tải lên',
    maxReach: 'Đã đủ ảnh',
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó',
    measurePlaceholder: 'g',
    ration: 'Khẩu phần'
  },
  recipe: {
    sendComment: 'Gửi',
    comment: 'Nhận xét',
    challenge: 'Thử thách',
    updatedBy: 'Đăng bởi',
    energy: 'Năng lượng',
    readDirection: 'Đọc hướng dẫn',
    iMadeIt: 'Tôi đã làm',
    noComments: 'Chưa có nhận xét',
    noChallenges: 'Chưa có thử thách',
    signinToComment: 'Đăng nhập để nhận xét',
    showLessComment: 'Thu gọn nhận xét',
    showMoreComment: 'Xem tất cả nhận xét',
    notSignIn: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để nhận xét',
    reply: 'Trả lời',
    oneReply: 'trả lời',
    replies: 'trả lời',
    confirmDeleteComment: 'Bạn chắc chắn muốn xóa nhận xét này?',
    delete: 'Xóa',
    commentPlaceholder: 'Nhập nhận xét',
    addToCollection: 'Thêm vào bộ sưu tập',
    addToMenu: 'Thêm vào thực đơn',
    addToShoppingList: 'Thêm vào danh sách mua',
    noCollection: 'Chưa có bộ sưu tập',
    collectionNamePlaceholder: 'Nhập tên bộ sưu tập',
    collectionNameError: 'Tên bộ sưu tập không hợp lệ',
    addNewCollection: 'Tạo bộ sưu tập mới',
    chooseDate: 'Chọn ngày',
    chooseSession: 'Chọn bữa',
    morning: 'Bữa sáng',
    lunch: 'Bữa trưa',
    dinner: 'Bữa tối',
    yum: 'Ngon lắm',
    easyPeasy: 'Dễ lắm luôn',
    yuck: 'Hổng ngon gì hết',
    toughNut: 'Khó quá à',
    all: 'Tất cả'
  },
  validation: {
    contentRequired: '* Nhập bước thực hiện',
    cookingTime: '> 0 phút',
    massRequired: 'Khối lượng > 0',
    titleRequired: '* Nhập tiêu đề',
    titleMaxLength: 'Tiêu đề không quá 255 kí tự',
    rationRequired: '* Nhập khẩu phần',
    rationMin: 'Ít nhất 1 người ăn',
    cookingTimeRequired: '* Nhập thời gian thực hiện',
    cookingTimeMin: '> 0 phút',
    cookingTimeMax: `< ${MAX_COOKING_TIME} phút`,
    levelChoose: 'Chọn độ khó',
    ingredientRequired: 'Thêm ít nhất 1 nguyên liệu',
    stepRequired: 'Thêm ít nhất 1 bước thực hiện',
    thumbnailRequired: 'Chọn hình đại diện cho công thức',
    categoryRule: 'Tên phân loại không chứa kí tự đặc biệt',
    categoryRequired: '* Nhập tên phân loại'
  },
  dashboard: {
    addNewCategory: 'Thêm phân loại',
    updateCategory: 'Cập nhật phân loại',
    parentCategory: 'Phân loại cha',
    notSelectParentId: 'Không chọn để tạo phân loại cha',
    confirmToDeleteCategory: 'Xác nhận xóa phân loại này?',
    enterTitleToFind: 'Nhập tên để tìm',
    parentCategoryVi: 'Phân loại cha tiếng việt',
    parentCategoryEn: 'Phân loại cha tiếng anh'
  },
  search: {
    user: 'Mọi người',
    filter: 'Bộ lọc',
    sortBy: 'Sắp theo',
    relevance: 'Liên quan',
    newest: 'Mới nhất',
    popular: 'Phổ biến',
    inputIngre: 'Có nguyên liệu này',
    inputWithoutIngre: 'Không có nguyên liệu này',
    hour: 'giờ',
    cookingTimeLessThan: 'Thời gian nấu ít hơn',
    with: 'Có',
    without: 'Không có',
    noResult: 'Không tìm thấy công thức phù hợp'
  },
  profile: {
    follow: 'Theo dõi',
    following: 'Bỏ theo dõi',
    followers: 'Người theo dõi',
    followings: 'Đang theo dõi',
    collection: 'Bộ sưu tập',
    changeCollectionName: 'Đổi tên bộ sưu tập',
    changeCollectionNamePlaceholder: 'Nhập tên mới cho bộ sưu tập',
    changeName: 'Đổi tên',
    noRecipeInCollection: 'Chưa có công thức trong bộ sưu tập này',
    noCollections: 'Chưa có bộ sưu tập nào',
    confirmToDeleteCollection: 'Bạn chắc chắn muốn xóa bộ sưu tập này?',
    customize: 'Tối ưu tìm kiếm',
    userInfo: 'Thông tin tài khoản',
    shoppingList: 'Danh sách mua',
    changePassword: 'Đổi mật khẩu',
    changePassFrequently:
      'Đổi mật khẩu thường xuyên để bảo vệ tài khoản của bạn',
    updateProfileSucceed: 'Cập nhật thông tin thành công',
    updateAvatar: 'Cập nhật hình đại diện',
    noFollowing: 'Chưa theo dõi người nào',
    noFollower: 'Chưa có người theo dõi',
    deleteRecipeInCollection: 'Xóa khỏi bộ sưu tập',
    confirmToDeleteRecipeInCollection:
      'Xác nhận xóa công thức này khỏi bộ sưu tập?',
    deleteRecipe: 'Xóa công thức',
    confirmToDeleteRecipe: 'Xác nhận xóa công thức này?',
    editRecipe: 'Sửa công thức',
    deleteRecipeInMealPlanner: 'Xóa khỏi bữa ăn',
    dish: 'món',
    dishes: 'món',
    today: 'Hôm nay',
    recommendPlanner: 'Đề xuất thực đơn'
  },
  notification: {
    liked: 'đã thích công thức',
    commented: 'đã bình luận',
    followed: 'đã theo dõi bạn',
    replied: 'đã trả lời bạn',
    notification: 'Thông báo',
    noNotification: 'Chưa có thông báo'
  }
}
