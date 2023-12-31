import azure.cognitiveservices.speech as speechsdk

# Creates an instance of a speech config with specified subscription key and service region.
speech_key, service_region = "<ACCESS-KEY-GOES-HERE>", "westus"

def translate_speech_to_text():
    """
    translate_speech_to_text() translates speech input to another language and outputs the translated text.
    The user can specify input and output languages.
    The user is prompted to speak into the mic, and if speech is recognized, it is translated into the target language.
    The text of this translation is the output.
    """
    translation_config = speechsdk.translation.SpeechTranslationConfig(subscription=speech_key, region=service_region)

    from_language = 'en-US'
    to_language = 'de'
    translation_config.speech_recognition_language = from_language
    translation_config.add_target_language(to_language)

    #Create a translation recognizer using an audio file as input
    recognizer = speechsdk.translation.TranslationRecognizer(translation_config=translation_config)

    print('Speak into the microphone:')
    result = recognizer.recognize_once()
    #Check the result
    if result.reason == speechsdk.ResultReason.TranslatedSpeech:
        print("Recognized '{}':{}".format(from_language, result.text))
        print("Translated into {}: {}".format(to_language, result.translations[to_language]))
    elif result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized {} (text could not be translated)".format(result.text))
    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No match: speech could not be recognized)".format(result.no_match_details))
    elif result.reason == speechsdk.ResultReason.Canceled:
        print("Canceled: Reason={}".format(result.cancellation_details.reason))
        if result.cancellation_details.reason == speechsdk.CancellationReason.error:
            print("Canceled: ErrorDetails={}".format(result.cancellation_details.error_details))
            
translate_speech_to_text()