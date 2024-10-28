<?php

namespace App\Http\Pagination;

use Illuminate\Http\Resources\Json\PaginatedResourceResponse;

class JSONStandardPaginatedResourceResponse extends PaginatedResourceResponse
{
    protected function meta($paginated)
    {
        $metaData = parent::meta($paginated);
        
        return [
            'currentPage' => $metaData['current_page'] ?? null,
            'from' => $metaData['from'] ?? null,
            'lastPage' => $metaData['last_page'] ?? null,
            'links' => $metaData['links'] ?? null,
            'path' => $metaData['path'] ?? null,
            'perPage' => $metaData['per_page'] ?? null,
            'to' => $metaData['to'] ?? null,
            'total' => $metaData['total'] ?? null,
        ];
    }
}