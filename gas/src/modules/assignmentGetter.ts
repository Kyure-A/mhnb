function nanka_ii_mojiretunosyoriwosuru_kansuu(course_name: string): string {
    // "_" とかを消すことでうまいこと教科の名前を抽出する関数
}

export async function getClassroomAssignments(): any {
    const all_courses: GoogleAppsScript.Classroom.Schema.Course | undefined = Classroom.Courses?.list().courses;

    let params = [];

    if (all_courses == undefined) return [[]];

    for (const course of [...[all_courses]]) {
        const response: GoogleAppsScript.Classroom.Schema.CourseWork[] | undefined = Classroom.Courses?.CourseWork?.list(course.id).courseWork;

        if (response == undefined) continue;

        for (const work of response) {
            if (!(work.workType == "ASSIGNMENT") || work == undefined) continue;

            const homework_name: string = work.title;
            const subject_name: string = nanka_ii_mojiretunosyoriwosuru_kansuu(course.name);
            const description: string = work.description;

            params.push({
                homework: homework_name,
                subject: subject_name,
                month: work.dueDate.month.toString(),
                day: work.dueDate.day.toString(),
                description: description
            })
        }
    }

    return params;
}

export async function getMoodleAssignments(): any {

}
