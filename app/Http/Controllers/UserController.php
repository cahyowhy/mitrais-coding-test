<?php


namespace App\Http\Controllers;


use App\ResponseStatus;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function all()
    {
        return response()->json(User::all());
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'mobile_number' => 'required',
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            $data = $validator->errors()->toJson();
            $status = ResponseStatus::INPUT_NOT_VALID;

            return response()->json(compact('data', 'status'), ResponseStatus::HTTP_BAD_REQUEST);
        }

        $payload = $this->generatePayloadFromRequest($request, ['mobile_number','email']);
        $data = User::where($payload)->first();

        if (!empty($data)) {
            $status = ResponseStatus::LOGIN_SUCCESS;

            return response()->json(compact('data', 'status'), ResponseStatus::HTTP_OK);
        }

        $status = ResponseStatus::LOGIN_FAILED;
        return response()->json(compact('data', 'status'), ResponseStatus::HTTP_OK);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile_number' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            $data = $validator->errors()->toJson();
            $status = ResponseStatus::INPUT_NOT_VALID;

            return response()->json(compact('data', 'status'), ResponseStatus::HTTP_BAD_REQUEST);
        }

        $keys = ['gender', 'firstname', 'lastname', 'birthdate', 'email', 'mobile_number'];
        $payload = $this->generatePayloadFromRequest($request, $keys);
        $payload['name'] = $payload['firstname'] . " " . $payload['lastname'];

        if ($request->get('id') !== null) {
            $data = User::find($request->get('id'))->update($payload);
        } else {
            $data = User::create($payload);
        }

        $status = ResponseStatus::SAVE_SUCCESS;

        return response()->json(compact('data', 'status'), ResponseStatus::HTTP_CREATED);
    }
}
