// Import necessary functions and libraries
import { render, act } from "@testing-library/react"; // Used to render components in tests
import axios from 'axios'; // HTTP client used to make API requests
import Dashboard from "./Dashboard"; // The component being tested
import React from "react"; // Library for building the component
import '@testing-library/jest-dom/extend-expect'; // Provides additional matchers for Jest

// Mock child components using Jest mocks
// These replace the real components with dummy ones that return a div with their name
// Mock the axios module using Jest mocks
// This replaces the real axios module with a mock one
jest.mock('./Sidebar', () => () => <div>Sidebar</div>);
jest.mock('./MapApp', () => () => <div>MapApp</div>);
jest.mock('./HouseList', () => () => <div>HouseList</div>);
jest.mock('axios');

// Define a test using Jest's 'test' function
test("renders Dashboard without crashing", async () => {
  // Setup mock response for axios.get using Jest's mocking functions
  // This makes axios.get return a promise that resolves with an object containing an empty array
  axios.get.mockResolvedValueOnce({
    data: [],
  });

  // Define a variable to hold the 'getByText' function
  let getByText;
  
  // Use 'act' to render the component and assign 'getByText'
  // 'act' ensures that all updates have been applied to the DOM before continuing
  await act(async () => {
    const result = render(<Dashboard />);
    getByText = result.getByText;
  });

  // Use 'getByText' to query the rendered component for elements with specific text
  // Use 'toBeInTheDocument' to assert that these elements are in the document
  expect(getByText("Sidebar")).toBeInTheDocument();
  expect(getByText("MapApp")).toBeInTheDocument();
  expect(getByText("HouseList")).toBeInTheDocument();
});
