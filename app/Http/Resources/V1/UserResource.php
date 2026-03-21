<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "email" => $this->email,
            "avatarPath" => $this->getAvatarPath(),
            "createdAt" => $this->created_at
                ->timezone(config(
                    "app.client_timezone",
                    config("app.timezone")
                ))
                ->toDateTimeString(),
            "updatedAt" => $this->updated_at
                ->timezone(config(
                    "app.client_timezone",
                    config("app.timezone")
                ))
                ->toDateTimeString(),
            "token" => $this->when(isset($this->token), $this->token),
        ];
    }
}
