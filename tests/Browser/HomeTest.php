<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

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
                ->assertsee('Test button');
        });
    }
}
