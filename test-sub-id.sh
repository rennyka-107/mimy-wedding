#!/bin/bash

echo "🧪 Testing Sub_ID Tracking..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Insert với sub_id = "test_script"
echo "📝 Test 1: Inserting visit with sub_id='test_script'"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"sub_id": "test_script", "region": "Script Test"}')

echo "Response: $RESPONSE"

# Check if successful
if echo "$RESPONSE" | grep -q '"status":"success"'; then
    echo -e "${GREEN}✓ API returned success${NC}"
    
    # Extract sub_id from response
    SUB_ID=$(echo "$RESPONSE" | grep -o '"sub_id":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$SUB_ID" == "test_script" ]; then
        echo -e "${GREEN}✓ sub_id in response is correct: '$SUB_ID'${NC}"
    else
        echo -e "${RED}✗ sub_id in response is wrong: '$SUB_ID' (expected 'test_script')${NC}"
    fi
else
    echo -e "${RED}✗ API returned error${NC}"
fi

echo ""

# Test 2: Insert với sub_id = "facebook"
echo "📝 Test 2: Inserting visit with sub_id='facebook'"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"sub_id": "facebook", "region": "Test Region"}')

echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q '"status":"success"'; then
    echo -e "${GREEN}✓ API returned success${NC}"
    
    SUB_ID=$(echo "$RESPONSE" | grep -o '"sub_id":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$SUB_ID" == "facebook" ]; then
        echo -e "${GREEN}✓ sub_id in response is correct: '$SUB_ID'${NC}"
    else
        echo -e "${RED}✗ sub_id in response is wrong: '$SUB_ID' (expected 'facebook')${NC}"
    fi
else
    echo -e "${RED}✗ API returned error${NC}"
fi

echo ""

# Test 3: Fetch recent visits
echo "📝 Test 3: Fetching recent visits from API"
RESPONSE=$(curl -s -X GET "http://localhost:3000/api/visits?limit=5")

if echo "$RESPONSE" | grep -q '"status":"success"'; then
    echo -e "${GREEN}✓ Successfully fetched visits${NC}"
    
    COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | cut -d':' -f2)
    echo "Total visits returned: $COUNT"
    
    # Check if test_script is in the response
    if echo "$RESPONSE" | grep -q '"sub_id":"test_script"'; then
        echo -e "${GREEN}✓ Found visit with sub_id='test_script'${NC}"
    else
        echo -e "${YELLOW}⚠ Did not find visit with sub_id='test_script'${NC}"
    fi
    
    # Check if facebook is in the response
    if echo "$RESPONSE" | grep -q '"sub_id":"facebook"'; then
        echo -e "${GREEN}✓ Found visit with sub_id='facebook'${NC}"
    else
        echo -e "${YELLOW}⚠ Did not find visit with sub_id='facebook'${NC}"
    fi
else
    echo -e "${RED}✗ Failed to fetch visits${NC}"
fi

echo ""
echo "================================"
echo "🎯 Test Summary:"
echo "--------------------------------"
echo "✓ Check terminal logs for backend output"
echo "✓ Check browser at http://localhost:3000/admin to see visits"
echo "✓ Check database directly:"
echo "   psql -h localhost -U postgres -d mimy_wedding -c \"SELECT * FROM page_visits ORDER BY created_at DESC LIMIT 5;\""
echo "================================"
