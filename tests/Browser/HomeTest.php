<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\Product\Product;

class HomeTest extends DuskTestCase
{
    /**     *
     * @return void
     */
    public function testSeeHomepage()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->screenshot('homepage')
                ->assertSee('Test')
                ->assertsee('TEST BUTTON');
        });
    }
}
