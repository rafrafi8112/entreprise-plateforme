<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    // Display a listing of projects
    public function index()
    {
        $projects = Project::with(['manager', 'members', 'tasks'])->get();
        return ProjectResource::collection($projects);
    }

    // Store a newly created project
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());
        return response()->json($project, Response::HTTP_CREATED);
    }

    // Display the specified project
    public function show(Project $project)
    {
        return new ProjectResource($project);
    }

    // Update the specified project
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());
        return response()->json($project);
    }

    // Remove the specified project from storage
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}