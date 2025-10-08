<?php

namespace App\Http\Requests\Api\Me;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Sanctum már védi a route-ot
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'name'  => ['required','string','max:255'],
            'email' => [
                'required','email','max:255',
                Rule::unique('users','email')->ignore($userId),
            ],
            'password' => ['nullable','string','min:8','confirmed'], // password_confirmation kell, ha küldöd
        ];
    }
}
