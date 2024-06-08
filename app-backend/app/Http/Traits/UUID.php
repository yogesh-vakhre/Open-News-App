<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;

trait UUID
{
    /**
     * Boot the trait.
     * This method is automatically called when the model is booting.
     */
    protected static function boot()
    {
        // Call the parent boot method to ensure other traits on the model are also booted
        parent::boot();

        /**
         * Listen for the creating event on the model.
         * Sets the 'id' to a UUID using Str::uuid() on the instance being created
         * if the primary key is not already set.
         *
         * @param \Illuminate\Database\Eloquent\Model $model
         */
        static::creating(function ($model) {
            if ($model->getKey() === null) {
                // Generate and set a UUID for the model's primary key
                $model->setAttribute($model->getKeyName(), Str::uuid()->toString());
            }
        });
    }

    /**
     * Indicates that the IDs are not auto-incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }

    /**
     * Indicates that the primary key is of type string.
     *
     * @return string
     */
    public function getKeyType()
    {
        return 'string';
    }
}
