import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IFormValues } from "./setting-area";
import { Humidity } from "./setting-comp-humidity";
import { Illuminance } from "./setting-comp-Illuminance";
import { ISetCompArgs, PowerSwitch } from "./setting-comp-power-switch";
import { Temperture } from "./setting-comp-temperture";

const TestFrom = (
    { setPointVal, onSubmitMock, SetComp }: { setPointVal: string | number | boolean, onSubmitMock: jest.Mock<any, any>, SetComp: (args: ISetCompArgs) => JSX.Element }
) => {
    const { handleSubmit, control, register, formState: { errors } } = useForm<IFormValues>({
        defaultValues: {
            cond: [{ setPoint: setPointVal }]
        }
    })

    const { fields } = useFieldArray({ control, name: "cond" })
    return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
            <SetComp register={register} errors={errors}
                index={0} value={fields[0].setPoint}></SetComp>
            <input type="submit" value="submit"></input>
        </form>
    )
}

describe('PowerSwitch', () => {
    const onSubmitMock = jest.fn();
    beforeEach(() => {
        render(
            <TestFrom setPointVal={true} onSubmitMock={onSubmitMock} SetComp={PowerSwitch}></TestFrom>
        )
        onSubmitMock.mockClear();
    });
    it('should be initialized as defaultChecked', () => {
        expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
    });
    it('should switch value on pressed', () => {
        fireEvent.click(screen.getByRole("checkbox"))
        expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);

    });
    it('should pass own value on submitting', async () => {
        fireEvent.submit(screen.getByRole("button", { name: "submit" }));
        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledTimes(1)
        );
        expect(onSubmitMock.mock.calls[0][0]).toEqual({ cond: [{ setPoint: true }] });
    });
})

describe('Illuminance', () => {
    const onSubmitMock = jest.fn();
    beforeEach(() => {
        render(
            <TestFrom setPointVal={500} onSubmitMock={onSubmitMock} SetComp={Illuminance}></TestFrom>
        )
        onSubmitMock.mockClear();

    });
    it('should be initialized as defaultValue ', () => {

        expect((screen.getByRole("spinbutton") as HTMLInputElement).value).toBe("500");

    });
    it('should pass valid value on submitting', async () => {
        fireEvent.submit(screen.getByRole("button", { name: "submit" }));
        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledTimes(1)
        );
        expect(onSubmitMock.mock.calls[0][0]).toEqual({ cond: [{ setPoint: 500 }] });
    });
    it('should not pass invalid value of out-of-ranfe numeric value on submitting and show error', async () => {
        expect((screen.getByRole("spinbutton") as HTMLInputElement).classList.contains("error")).toBe(false);
        fireEvent.input(screen.getByRole("spinbutton"), {
            target: {
                value: "20e",
            },
        });
        fireEvent.submit(screen.getByRole("button", { name: "submit" }));
        await waitFor(() =>
            expect(onSubmitMock).not.toBeCalled()
        );
        expect((screen.getByRole("spinbutton") as HTMLInputElement).classList.contains("error")).toBe(true);

    });
})



describe.each([
    ["Temperture", Temperture],
    ["Humidity", Humidity],
])(
    '%s',
    (setCompName, setComp) => {
        const onSubmitMock = jest.fn();
        beforeEach(() => {
            render(
                <TestFrom setPointVal={26.8} onSubmitMock={onSubmitMock} SetComp={setComp}></TestFrom>
            )
            onSubmitMock.mockClear();

        });
        it('should be initialized as defaultValue ', () => {

            expect((screen.getByRole("spinbutton") as HTMLInputElement).value).toBe("26.8");

        });
        it('should pass valid value on submitting', async () => {
            fireEvent.submit(screen.getByRole("button", { name: "submit" }));
            await waitFor(() =>
                expect(onSubmitMock).toHaveBeenCalledTimes(1)
            );
            expect(onSubmitMock.mock.calls[0][0]).toEqual({ cond: [{ setPoint: 26.8 }] });
        });
        it('should not pass invalid value of empty on submitting and show error', async () => {
            expect((screen.getByRole("spinbutton") as HTMLInputElement).classList.contains("error")).toBe(false);
            fireEvent.input(screen.getByRole("spinbutton"), {
                target: {
                    value: "",
                },
            });
            fireEvent.submit(screen.getByRole("button", { name: "submit" }));
            await waitFor(() =>
                expect(onSubmitMock).not.toBeCalled()
            );
            expect((screen.getByRole("spinbutton") as HTMLInputElement).classList.contains("error")).toBe(true);

        });
    }
);

