export class StudentWarningHistory {
    comment!: string;
    course!: {
        name: string;
        lesson: {
            name: string;
        };
        type: string;
        teacher: {
            first_name: string;
            last_name: string;
        };
        education_level: string;
    }
    created_at!: string;
    id!: number;
    response!: string;
    user_updater!: {
        first_name: string;
        last_name: string;
    }
    updated_at!: string;
    user_creator!: {
        first_name: string;
        last_name: string;
    };
}