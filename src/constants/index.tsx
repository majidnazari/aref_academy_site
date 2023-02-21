export const typesObject: any = {
    'public': 'عمومی',
    'semi-private': 'نیمه خصوصی',
    'private': 'خصوصی',
    'master': 'مَستر'
};

export const educationLevelsObject: any = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    '11': '11',
    '12': '12',
    '13': 'فارغ التحصیل',
    '14': 'دانشجو',
}

export const dayOfWeeksObject: any = {
    'شنبه': 'MONDAY',
    'یکشنبه': 'Sunday',
    'دوشنبه': 'Monday',
    'سه شنبه': 'Tuesday',
    'چهارشنبه': 'Wednesday',
    'پنج شنبه': 'Thursday',
    'جمعه': 'Friday',
}

export const majorObject: any = {
    'mathematics': 'ریاضی',
    'experimental': 'تجربی',
    'humanities': 'انسانی',
    'art': 'هنر',
    'other': 'سایر'
}

export enum attendanceStatus {
    online_to_present = 'online_to_present',
    free_for_one = 'free_for_one',
    free_for_two = 'free_for_two',
    guest = 'guest',
    normal = 'normal'
}

export const dayOfWeeksCosultant: any = {
    // SATURDAY = 'شنبه',
    // SUNDAY = 'یکشنبه',
    // MONDAY = 'دوشنبه',
    // TUESDAY = 'سه شنبه',
    // WEDNESDAY = 'چهارشنبه',
    // THURSDAY = 'پنج شنبه',
    // FRIDAY = 'جمعه',

    'شنبه': 'SATURDAY',
    'یکشنبه': 'SUNDAY',
    'دوشنبه': 'MONDAY',
    'سه شنبه': 'TUESDAY',
    'چهارشنبه': 'WEDNESDAY',
    'پنج شنبه': 'THURSDAY',
    'جمعه': 'FRIDAY',
}

export enum DayOfWeekConsultantEnum {
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
}

export const attendanceStatusObject: any = {
    normal: 'عادی',
    online_to_present: 'جابجایی از آنلاین به حضوری',
    free_for_one: 'جلسه اول رایگان',
    free_for_two: 'جلسه دوم رایگان',
    guest: 'مهمان',
}

export const absenceMainStatusObject: any = {
    'present': 'حاضر',
    'dellay15': 'تاخیر زیر ۱۵ دقیقه',
    'dellay30': 'تاخیر بالای ۱۵ دقیقه',
    'absent': 'غایب',
}

export const ConstantTestLevel: any = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D'
}
