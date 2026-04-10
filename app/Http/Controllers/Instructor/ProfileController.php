<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\InstructorProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        $profile = InstructorProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['specialization' => '', 'bio' => '']
        );

        return Inertia::render('instructor/profile/Edit', ['profile' => $profile]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'specialization' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        if (isset($validated['skills'])) {
            $validated['skills'] = array_map('trim', explode(',', $validated['skills']));
        }

        $profile = InstructorProfile::where('user_id', $request->user()->id)->first();
        $profile->update($validated);

        return redirect()->back()->with('success', 'Profile updated.');
    }
}
