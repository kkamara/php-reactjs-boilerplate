<?php

namespace App\Models\V1;

use Carbon\Carbon;

trait TimeStampHandling
{
    public function setCreatedAtAttribute(mixed $value): void
    {
        if ($value === null) {
            $this->attributes['created_at'] = null;

            return;
        }

        $this->attributes['created_at'] = Carbon::parse($value)
            ->utc()
            ->toDateTimeString();
    }

    public function setUpdatedAtAttribute(mixed $value): void
    {
        if ($value === null) {
            $this->attributes['updated_at'] = null;

            return;
        }

        $this->attributes['updated_at'] = Carbon::parse($value)
            ->utc()
            ->toDateTimeString();
    }
}