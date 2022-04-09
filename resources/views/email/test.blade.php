@component('mail::message')
# Hi,

The body of your message.

@component('mail::panel')
This is the panel content.
@endcomponent

@component('mail::table')
| Laravel       | Table         | Example  |
| ------------- |:-------------:| --------:|
| Col 2 is      | Centered      | $10      |
| Col 3 is      | Right-Aligned | $20      |
@endcomponent

@component('mail::button', ['url' => 'https://github.com/kkamara'])
Kelvin Kamara at Github
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
