Donation Form -- Starter
I’m going to turn the donation form into a simple multi-step flow instead of one long form. I’ll keep all the form data in one central state and track which step the user is on. I’ll break it into three clear sections: personal details, donation amount, and payment info.

Users will be able to move forward and back without losing what they’ve entered, and I’ll add a basic progress indicator so they know where they are. Each step will render conditionally, and once the form is submitted and passes validation, I’ll log the data and show a success message.