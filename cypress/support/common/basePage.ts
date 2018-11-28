import { BaseElement } from './baseElements';
import promisify from 'cypress-promise';

export class BasePage extends BaseElement {

    type(locator: string, value: string, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should('be.visible').clear().type(value);
    }
    click(locator: string, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should('be.visible').click();
    }

    scrollIntoElement(locator: string, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.scrollIntoView().should('be.visible');
    }
    doubleClick(locator: string, param: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should('be.visible').dblclick();
    }
    checkToCheckbox(locator: string, isChecked: boolean, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        if (isChecked) {
            element.not('[disabled]').check().should('be.checked');
        } else {
            element.not('[disabled]').uncheck().should('not.be.checked');
        }
    }
    checkToCheckboxByValues(locator: string, isChecked: boolean, ...values: string[]) {
        const element = this.findElement(locator);
        if (isChecked) {
            element.not('[disabled]').check(values).should('be.checked');
        } else {
            element.not('[disabled]').uncheck(values).should('not.be.checked');
        }
    }
    selectTheOption(locator: string, value: string, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.not('[disabled]').select(value);
    }
    selectMultiOptions(locator: string, ...values: string[]) {
        const element = this.findElement(locator);
        element.not('[disabled]').select(values);
    }
    shouldHasValue(locator: string, value: string, negative: boolean = true, param?: string) {
        const should = negative ? 'have' : 'not.have';
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should(`${should}.value`, value);
    }
    shouldHasText(locator: string, text: string, negative: boolean = true, param?: string) {
        const should = negative ? 'have' : 'not.have';
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should(`${should}.text`, text);
    }
    shouldHasStyle(locator: string, style: string, param?: string) {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should('have.attr', 'style', style);
    }
    shouldVisible(locator: string, negative: boolean = true, param?: string) {
        const should = negative ? 'be' : 'not.be';
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        element.should(`${should}.visible`);
    }
    gotoURL(url: string) {
        cy.visit(url);
    }

    timeInSecond(ms: number) {
        return ms * 1000;
    }
    wait(s: number) {
        cy.wait(s * 1000);
    }
    async getText(locator: string, param?: string): Promise<string> {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        const text = await promisify(element.then($el => $el.text()));
        return text;
    }

    async isControlExist(locator: string, param?: string): Promise<boolean> {
        const element = param ? this.findElement(locator, param) : this.findElement(locator);
        const lengthOfElement = await promisify(element.then($el => $el.length));
        return lengthOfElement !== 0;
    }
}
