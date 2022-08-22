
interface Teacher {
    first_name: string;
    last_name: string;
}

interface Lesson {
    id: number;
    name: string;
}

interface Course {
    id: number
    name: string;
    teacher: Teacher;
    lesson: Lesson;
}

export interface CourseSessionType {
    id: string;
    name: string;
    start_date: string;
    start_time: string;
    end_time: string;
    special: boolean;
    course: Course;
}



