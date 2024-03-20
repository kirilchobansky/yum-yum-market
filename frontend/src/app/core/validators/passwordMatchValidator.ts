import { AbstractControl } from "@angular/forms";

export const passwordMatchValidator = (passwordControlName: string, rePassControlName: string) => {
    const validator = (form: AbstractControl) => {
        const passwordControl = form.get(passwordControlName);
        const rePassControl = form.get(rePassControlName);

        if(!passwordControl || !rePassControl) return;

        if(passwordControl.value !== rePassControl.value){
            rePassControl.setErrors({notMatch: true});
        }else {
            const errors = rePassControl.errors;
            if(!errors) return;

            delete errors.notMatch;
            rePassControl.setErrors(errors);
        }
        return validator;
    }
}