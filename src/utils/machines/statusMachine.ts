import { createMachine } from "xstate";

const taskStateMachine= createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtADZ0AT0FDkaEMXLVadAHQ0A+kwBOWKOrjwkzVhy499-BABYATGMQBGcwAZFDly4DMboQE4h5oW6l0WUoaekVYAFcAIyIOSEYWNk5uPkRzAA5FLzcAdnMvdLcMoXShIWsQcQRLAFYc51d7B3Scmo8HAOlg+TCSJg0sADd4-USjFNM0zPNzNodWrwK3Nq8bBHTbRXzFgodbeYdLLxzAmVIQhUUAMwiMXAgEw2STUDMa80Ui3PzD9JqDkSVRBuWw1LY7Y4OGolGGSLrnHpKMhYIhMAA2YHYI1AY2eqQsH2htT2GyhbTqa1ybiyOzq-iENR85lO3VCSJIGDIYDRGIeoyexnx+Wcf2yhzaORylhyqyBCFsBUU-1cLUsf3Sx06UiAA */
    initial:"in_progress",
    states:{
        "in_progress":{},
        "submited":{},
        "approved":{},
        "funded":{},
        "completed":{},
        "cancelled":{}
    }
})
  