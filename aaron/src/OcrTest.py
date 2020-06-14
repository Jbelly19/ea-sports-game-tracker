"""
Test script for image to text conversions (optical character recognition) (OCR)
"""

import unittest

import pytesseract


class OcrTest(unittest.TestCase):
    """
    Test class for optical character recognition (OCR)

    This test uses pytesseract built on Google's tesseract OCR. pytesseract's versions can be found in the virtualenv's
    requirements.txt file. This has been tested with the following tesseract version:
        tesseract 4.1.1
            leptonica-1.79.0
                libgif 5.2.1 : libjpeg 9d : libpng 1.6.37 : libtiff 4.1.0 : zlib 1.2.11 : libwebp 1.1.0 : libopenjp2 2.3.1
            Found AVX
            Found SSE

    TODO aapl365: To have repeatable output, build tessseract from source or keep version binaries depending on host OS.

    Note: pytesseract assumes RGB image encoding. If OpenCV images are used, they will need to be converted from
    BGR to RGB
    """

    # Constants
    DATA_DIR = '../data/'
    IMAGE_DIR = DATA_DIR + 'Examples/20200329_020409468_iOS/'

    @staticmethod
    def _image_to_text_test(filename, expected_text):
        """
        Compare a converted image's text to an expected string.

        :param filename: filename of the image under test in the IMAGE_DIR
        :param expected_text: expected text converted from the image under test
        :return (result, msg):
            result: true if the converted text matches the expected test. false otherwise
            msg: failure string on failure. None otherwise
        """
        converted_text = pytesseract.image_to_string(OcrTest.IMAGE_DIR + filename)
        return (expected_text == converted_text), 'actual: {}, expected: {}'.format(converted_text, expected_text)

    def test_score(self):
        """
        Score text
        """
        (result, msg) = OcrTest._image_to_text_test('score_20200329_020409468_iOS.jpg', '10- 3')
        self.assertTrue(result, msg=msg)

    def test_passing_text(self):
        """
        Passing text
        """
        (result, msg) = OcrTest._image_to_text_test('passing_20200329_020409468_iOS.jpg', 'PASSING')
        self.assertTrue(result, msg=msg)

    def test_passing_right(self):
        """
        Right team's passing
        """
        (result, msg) = OcrTest._image_to_text_test('passing_right_20200329_020409468_iOS.jpg', '73.3%')
        self.assertTrue(result, msg=msg)

    def test_powerplay_right(self):
        """
        Right team's powerplays
        """
        (result, msg) = OcrTest._image_to_text_test('powerplay_right_20200329_020409468_iOS.jpg', '0/0')
        self.assertTrue(result, msg=msg)


if __name__ == '__main__':
    """
    Entrypoint for the OcrTest executable
    """
    unittest.main()
