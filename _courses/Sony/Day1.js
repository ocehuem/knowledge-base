function showExample(){

    const code =
`# Python List Experimentation

nums = [1,2,3,4,5]

print(nums)

print(nums[0])

nums.append(10)

print(nums)

nums.pop()

print(nums)

for x in nums:
    print(x)

for i in range(len(nums)):
    print(i, nums[i])

if 3 in nums:
    print("Found")
`;

    document.getElementById("exampleBox").textContent = code;
}
