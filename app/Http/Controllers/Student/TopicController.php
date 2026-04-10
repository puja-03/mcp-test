<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Topic;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function show(Topic $topic)
    {
        $user = request()->user();
        $topic->load(['chapter.course.chapters.topics']);

        $isEnrolled = Enrollment::whereHas('batch', fn ($q) => $q->where('course_id', $topic->chapter->course->id))
            ->where('student_id', $user->id)
            ->where('status', 'active')
            ->exists();

        abort_if(! $isEnrolled, 403, 'You are not enrolled in this course.');

        return Inertia::render('student/topics/Show', [
            'topic' => $topic,
            'course' => $topic->chapter->course,
        ]);
    }
}
