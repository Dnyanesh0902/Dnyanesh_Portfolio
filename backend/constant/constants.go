package constant

type errorConstants struct {
	InvalidRequestPayload string
}

var ErrorConstants = errorConstants{
	InvalidRequestPayload: "Invalid request payload",
}
