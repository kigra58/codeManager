
export const validationMessageHandler = (
    fieldName: string,
    fieldType: "emptyField" | "invalidField"|"fieldLength",
    length?: number
  ): string => {
    const MessageList: { [key: string]: string } = {
      emptyField: `${fieldName} is required`,
      invalidFiEld: `Please enter a valid ${fieldName}`,
      fieldLength:`${fieldName} must be at least ${length??8} characters"`
    };
    return MessageList[fieldType];
  };
  