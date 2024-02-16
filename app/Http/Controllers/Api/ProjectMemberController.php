<?php

namespace App\Http\Controllers\Api;

use App\Models\ProjectMember;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectMemberRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Resources\ProjectMemberResource;
use Illuminate\Http\Response;

class ProjectMemberController extends Controller
{
    // Display a listing of project members
    public function index()
    {
        $projectMembers = ProjectMember::with(['project', 'user'])->get();
        return ProjectMemberResource::collection($projectMembers);
    }

    // Store a newly added project member
    public function store(StoreProjectMemberRequest $request)
    {
        $projectMember = ProjectMember::create($request->validated());
        return response()->json($projectMember, Response::HTTP_CREATED);
    }

    // Display the specified project member
    public function show(ProjectMember $projectMember)
    {
        return response()->json($projectMember);
    }

    // Update the specified project member
    public function update(UpdateProjectMemberRequest $request, ProjectMember $projectMember)
    {
        $projectMember->update($request->validated());
        return response()->json($projectMember);
    }

    // Remove the specified project member from storage
    public function destroy(ProjectMember $projectMember)
    {
        $projectMember->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}