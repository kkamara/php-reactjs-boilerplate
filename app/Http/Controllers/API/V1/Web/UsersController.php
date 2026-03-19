<?php

namespace App\Http\Controllers\API\V1\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\V1\UserCollection;
use App\Models\V1\User;

class UsersController extends Controller
{
    public function getUsers(Request $request): UserCollection {
        $data = User::orderBy("id", "DESC")
            ->paginate(7)
            ->appends($request->query());

        return new UserCollection($data);
    }
}
