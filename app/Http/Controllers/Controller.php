<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function generatePayloadFromRequest(Request $request, $valid_param)
    {
        $payload = [];
        foreach ($valid_param as $param) {
            if ($request->get($param) !== null) {
                $payload[$param] = $request->get($param);
            }
        }

        return $payload;
    }

    public function generateParamFromFormData(string $property, array $props)
    {
        $entity = json_decode($property, true);
        $result = [];

        foreach ($props as $key) {
            if (array_key_exists($key, $entity)) {
                $result[$key] = $entity[$key];
            }
        }

        return $result;
    }
}
