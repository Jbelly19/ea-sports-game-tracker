"""
Test script for image to text conversions (optical character recognition) (OCR)
"""

import os
import unittest

import cv2
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
        # tesseract --help-psm output:
        #
        # Page segmentation modes:
        #   0    Orientation and script detection (OSD) only.
        #   1    Automatic page segmentation with OSD.
        #   2    Automatic page segmentation, but no OSD, or OCR. (not implemented)
        #   3    Fully automatic page segmentation, but no OSD. (Default)
        #   4    Assume a single column of text of variable sizes.
        #   5    Assume a single uniform block of vertically aligned text.
        #   6    Assume a single uniform block of text.
        #   7    Treat the image as a single text line.
        #   8    Treat the image as a single word.
        #   9    Treat the image as a single word in a circle.
        #  10    Treat the image as a single character.
        #  11    Sparse text. Find as much text as possible in no particular order.
        #  12    Sparse text with OSD.
        #  13    Raw line. Treat the image as a single text line,
        #        bypassing hacks that are Tesseract-specific.
        pre_process_filename = OcrTest._pre_process_image(OcrTest.IMAGE_DIR + filename)
        tesseract_args = '--oem 1 --psm 11'
        converted_text = pytesseract.image_to_string(pre_process_filename, lang='eng+osd', config=tesseract_args)
        return (expected_text == converted_text), 'actual: {}, expected: {}'.format(converted_text, expected_text)

    @staticmethod
    def _pre_process_image(filename):
        # Gaussian Blur 5,5 kernel
        # Best 200, 255 thresh

        # Best 190, 255 thresh
        (dir, basename) = os.path.split(filename)

        # Write grayscale
        img = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
        cv2.imwrite('{}/gray/{}'.format(dir, basename), img)

        # Gaussian blur
        #img = cv2.GaussianBlur(img, (5, 5), 0)

        # Write threshold
        unused, img = cv2.threshold(img, 190, 255, cv2.THRESH_BINARY_INV)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        cv2.imwrite('{}/pre/{}'.format(dir, basename), img)

        return '{}/pre/{}'.format(dir, basename)

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

    def test_page(self):
        """
        Test parsing a whole screenshot without cropping
        :return:
        """
        (result, msg) = OcrTest._image_to_text_test('all_left_20200329_020409468_iOS.jpg', 'tester')
        self.assertTrue(result, msg=msg)



if __name__ == '__main__':
    """
    Entrypoint for the OcrTest executable
    """
    unittest.main()
