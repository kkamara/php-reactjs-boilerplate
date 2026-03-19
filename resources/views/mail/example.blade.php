<x-mail::message>
    <x-mail::panel>
        <style>
            .lead {
                font-size: 18px;
                color: red;
            }
        </style>
        <div class="lead">
            This is a test email.
        </div>
    </x-mail::panel>

    <div>
        Thanks,<br>
        ${config.appName} &copy; 2026.
    </div>
</x-mail::message>
