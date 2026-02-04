import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'expo-checkbox';
import { styles } from './styles'

function FilterHeader(
    {
        header,
        selectedOptions,
        setSelectedOptions,
    }
    :
    {
        header: string,
        selectedOptions: Record<string, boolean>,
        setSelectedOptions: React.Dispatch<any>
    }
){
    const handleReset = () => {
        const clearedSelections = Object.fromEntries(
            Object.entries(selectedOptions).map(([key]) => [key, false])
        );
        setSelectedOptions(clearedSelections);
    }

    return(
        <View style={styles.filterHeaderWrapper}>
            <Text style={styles.filterHeader}>{header}</Text>
            <TouchableOpacity onPress={handleReset}>
                <Text style={styles.reset}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

function FilterOption(
    {
        option,
        selectedOptions,
        setSelectedOptions
    }
    :
    {
        option: string,
        selectedOptions: Record<string, boolean>,
        setSelectedOptions: React.Dispatch<any>
    }
){
    const handleCheck = () => {
        // handle unchecking the box
        if(selectedOptions[option]) {
            setSelectedOptions({...selectedOptions, [option]: false});
        }
        // handle checking the box
        else {
            setSelectedOptions({...selectedOptions, [option]: true});
        }
    }

    return(
        <View style={styles.filterOptionWrapper}>
            <Text style={styles.filterOption}>{option}</Text>
            <Checkbox
                value={selectedOptions[option]}
                onValueChange={handleCheck}
                color={selectedOptions[option] ? 'black' : 'mediumgrey'}
            />
        </View>
    )
}

function EventFilters() {
    const [dateOptions, _] = useState<Array<string>>(['Today', 'Tomorrow', 'This Week']);
    const [selectedDates, setSelectedDates] = useState<Record<string, boolean>>({});

    const [categoryOptions, setCategoryOptions] = useState<Array<string>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

    const handleSubmit = () => {
        // TODO
        // const startDate = null;
        // const endDate = null;
    }

    async function retrieveCategories() {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/config/categories`, { method: 'GET' });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || "Failed to fetch categories");
            }

            setCategoryOptions(data);
        }
        catch (error: any) {
            console.log(error instanceof Error ? error.message : "Failed to fetch categories");
        }
    }

    useEffect(() => {
        // initially, all date options are unselected
        const initSelectedDates : Record<string, boolean> = {};
        dateOptions.forEach((date) => {
            initSelectedDates[date] = false;
        });
        setSelectedDates(initSelectedDates);
        
        // grab categories from backend
        retrieveCategories();

        // initially, all category options are unselected
        const initSelectedCategories : Record<string, boolean> = {};
        categoryOptions.forEach((category) => {
            initSelectedCategories[category] = false;
        });
        setSelectedCategories(initSelectedCategories);
    }, []);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 20, paddingHorizontal: 20}}>
            <View>
                <Text style={styles.filterTitle}>Filter</Text>
                {dateOptions && dateOptions.length >= 0 &&
                    <>
                        <FilterHeader
                            header='Date'
                            selectedOptions={selectedDates}
                            setSelectedOptions={setSelectedDates}
                        />
                        {dateOptions.map((option, index) => 
                            <FilterOption
                                key={index}
                                option={option}
                                selectedOptions={selectedDates}
                                setSelectedOptions={setSelectedDates}
                            />
                        )}
                    </>
                }
                {categoryOptions && categoryOptions.length >= 0 &&
                    <>
                        <FilterHeader
                            header='Category'
                            selectedOptions={selectedCategories}
                            setSelectedOptions={setSelectedCategories}
                        />
                        {categoryOptions.map((option, index) => 
                            <FilterOption
                                key={index}
                                option={option}
                                selectedOptions={selectedCategories}
                                setSelectedOptions={setSelectedCategories}
                            />
                        )}
                    </>
                }
            </View>
        </SafeAreaView>
    );
}

export default EventFilters;