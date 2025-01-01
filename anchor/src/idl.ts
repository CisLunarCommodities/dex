export const IDL = {
  "version": "0.1.0",
  "name": "cce",
  "instructions": [
    {
      "name": "initialize_market",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commodity",
          "type": "string"
        },
        {
          "name": "initialPrice",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "commodity",
            "type": "string"
          },
          {
            "name": "currentPrice",
            "type": "u64"
          },
          {
            "name": "volume",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
}; 