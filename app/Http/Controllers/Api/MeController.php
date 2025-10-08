<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Me\ShowRequest;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Me\UpdateRequest;

class MeController extends Controller
{
    /**
     * GET /me
     * A bejelentkezett felhasználó adatai.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data'    => [
                'user' => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ],
                'current_token' => $user->currentAccessToken() ? [
                    'id'          => $user->currentAccessToken()->id,
                    'name'        => $user->currentAccessToken()->name,
                    'last_used_at'=> $user->currentAccessToken()->last_used_at,
                    'created_at'  => $user->currentAccessToken()->created_at,
                ] : null,
            ],
            'message' => 'Authenticated user.',
        ]);
    }

    /** POST /me – nem támogatott ebben a feladatban */
    public function store(Request $request)
    {
        return response()->json([
            'success' => false,
            'data'    => (object)[],
            'message' => 'Not supported.',
        ], 405);
    }

    /** GET /me/show – alternatíva az index-re */
    public function show(ShowRequest $request)
    {
        return $this->index($request);
    }

    

    /** DELETE /me – nem támogatott */
    public function destroy(Request $request)
    {
        return response()->json([
            'success' => false,
            'data'    => (object)[],
            'message' => 'Not supported.',
        ], 405);
    }

    public function update(UpdateRequest $request): JsonResponse
{
    $user = $request->user();

    $user->name  = $request->input('name', $user->name);
    $user->email = $request->input('email', $user->email);

    if ($request->filled('password')) {
        $user->password = \Illuminate\Support\Facades\Hash::make($request->input('password'));
    }

    $user->save();

    return response()->json([
        'success' => true,
        'data'    => [
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ],
        'message' => 'Profile updated.',
    ]);
}

}
