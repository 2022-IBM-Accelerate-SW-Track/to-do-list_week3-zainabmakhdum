import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "12/30/2023";

    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);

    const check = (screen.getAllByText(/History Test/i));
    expect(check.length).toBe(1);
   });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  expect(screen.queryByText("05/30/2023")).toBeNull();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, { target: { value: " History Test"}});

  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  expect(screen.queryByText(/History Test/i)).toBeNull();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(screen.queryByText(/History Test/i)).toBeNull();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2022";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByTestId(/History Test/i).style.background;
  expect(check).not.toBe("yellow")
 });
